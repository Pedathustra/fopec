if exists(select * from sys.views where name = 'vPersonAudit')
begin
	drop view vPersonAudit
end
go


create view vPersonAudit
as 
   

	select  t.id
		,	t.first_name
		,	t.last_name
		,	t.middle_name
		,	t.username 
		,	t.created_date
		,	t.altered_date
		,	t.updated_date
		,	t.is_active
		,	t.record_type
		,	idx = row_number()over(partition by t.id order by record_type desc, action_date desc)
	from (
			select p.id
				,	p.first_name
				,	p.last_name
				,	p.middle_name
				,	p.username 
				,	p.created created_date
				,	p.created  updated_date
				,	p.is_active
				,	'person' record_type
			from person p
			union 

			select  pa.person_id
				,	pa.first_name
				,	pa.last_name
				,	pa.middle_name
				,	pa.username
				,	null 
				,	pa.audit_datetime
				,	pa.is_active
				,	'audit' record_type
			from person_audit pa
	) t 

 
go

/*	 
	select  a.id,
			a.first_name,
			a.last_name,
			a.middle_name,
			a.username ,
			a.action_date,
			a.is_active,
			a.record_type,
			a.idx 
	from vPersonAudit a
	where a.id = 152
		and a.idx between 1 and 3
		

select * from person where id = 152
 
	*/