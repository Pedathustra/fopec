if exists (select * from sys.procedures where name = 'getPersonActivity')
begin
	drop proc getPersonActivity
end
go

create procedure getPersonActivity
	@name_display_type tinyint = 1
as 
	set nocount on;
	-- had to do this in a funky way
	-- the combination of formatting an entire table via a table function
	-- and with using count distincts caused issues in performance.
	-- this approach isolates these operations.
	select t.id,
		t.display_name,
		dta.audit_records,
		dta.company_records,
		dta.crowdsourced_research_records,
		dta.vote_records

	from  dbo.fnFormatPerson(@name_display_type) t
	join 	(
		select p.id,
			   count(distinct pa.id) audit_records,
			   count(distinct c.id) company_records,
			   count( distinct cr.id) crowdsourced_research_records,
			   count(distinct v.crowdsourced_research_id) vote_records
		from person p	
			left join person_audit pa on p.id = pa.person_id
			left join company c on p.id = c.person_id_created
			left join crowdsourced_research cr on p.id = cr.observing_person_id
			left join crowdsourced_research_vote v on p.id = v.person_id
		group by p.id
	) dta on t.id = dta.id
go




--exec getPersonActivity 3
  
 