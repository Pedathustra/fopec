if exists( select name from sys.procedures where name = 'getDatabaseObjectCounts')
begin
	drop proc getDatabaseObjectCounts
end
go

create proc getDatabaseObjectCounts
as 
	set nocount on;
	select  table_count,	
			view_count, 
			procedure_count,
			function_count,
			trigger_count
	from vCountDatabaseObjects
go


--exec  getDatabaseObjectCounts
 