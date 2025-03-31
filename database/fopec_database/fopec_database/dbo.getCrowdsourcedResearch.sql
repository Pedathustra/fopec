if exists(select 1 from sys.procedures where name = 'getCrowdsourcedResearch')
begin 
	drop proc getCrowdsourcedResearch
end
go

create proc getCrowdsourcedResearch

as
select	cr.id crowdsourced_id
	,	c.id as company_id
	,	c.name as company_name
	,	c.parent_company_id
	,	ot.id as ownership_type_id
	,	ot.description as ownership_type_description
	,	p.username
	,	cr.created
	,	cr.notes	
from crowdsourced_research cr 
	join company c on cr.company_id = c.id
	join ownership_type ot on cr.ownership_type_id = ot.id
	join person p on cr.observing_person_id = p.id
 
	order by cr.created desc
go


exec getCrowdsourcedResearch
